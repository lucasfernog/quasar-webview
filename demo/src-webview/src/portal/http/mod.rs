extern crate reqwest;
extern crate pbr;

use serde::Serialize;
use std::io;
pub mod error;
use error::*;

#[macro_use]
mod macros;

pub fn get(url: &String) -> reqwest::Result<reqwest::Response> {
    return reqwest::Client::new().get(url).send()
}

pub fn post_as_json<T: Serialize + ?Sized>(url: &String, payload: &T) -> reqwest::Result<reqwest::Response> {
    return reqwest::Client::new().post(url).json(payload).send()
}

pub fn download<T: io::Write>(url: &String, mut dest: T) -> Result<(), Error> {
    use io::BufRead;

    set_ssl_vars!();
    let resp = get(url)?;
    let size = resp
        .headers()
        .get(reqwest::header::CONTENT_LENGTH)
        .map(|val| {
            val.to_str()
                .map(|s| s.parse::<u64>().unwrap_or(0))
                .unwrap_or(0)
        })
        .unwrap_or(0);

    if !resp.status().is_success() {
        bail!(
            Error::Download,
            "Download request failed with status: {:?}",
            resp.status()
        )
    }

    let show_progress = if size == 0 { false } else { true };

    let mut src = io::BufReader::new(resp);
    let mut bar = if show_progress {
        let mut bar = pbr::ProgressBar::new(size);
        bar.set_units(pbr::Units::Bytes);
        bar.format("[=> ]");
        Some(bar)
    } else {
        None
    };
    loop {
        let n = {
            let buf = src.fill_buf()?;
            dest.write_all(&buf)?;
            buf.len()
        };
        if n == 0 {
            break;
        }
        src.consume(n);
        if let Some(ref mut bar) = bar {
            bar.add(n as u64);
        }
    }
    if show_progress {
        println!(" ... Done");
    }
    Ok(())
}