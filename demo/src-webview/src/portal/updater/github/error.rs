use std;
use zip::result::ZipError;
use reqwest;
use super::super::super::file;
use super::super::super::http;
use super::super::super::version;

#[derive(Debug)]
pub enum Error {
    Updater(String),
    Release(String),
    Network(String),
    Config(String),
    Io(std::io::Error),
    Zip(ZipError),
    File(file::error::Error),
    Version(version::error::Error),
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        use Error::*;
        match *self {
            Updater(ref s) => write!(f, "Github UpdaterError: {}", s),
            Release(ref s) => write!(f, "Github ReleaseError: {}", s),
            Network(ref s) => write!(f, "Github NetworkError: {}", s),
            Config(ref s) => write!(f, "Github ConfigError: {}", s),
            Io(ref e) => write!(f, "IoError: {}", e),
            Zip(ref e) => write!(f, "ZipError: {}", e),
            File(ref e) => write!(f, "FileError: {}", e),
            Version(ref e) => write!(f, "VersionError: {}", e),
        }
    }
}

impl std::error::Error for Error {
    fn description(&self) -> &str {
        "Github Updater Error"
    }

    fn cause(&self) -> Option<&std::error::Error> {
        use Error::*;
        Some(match *self {
            Io(ref e) => e,
            _ => return None,
        })
    }
}

impl From<std::io::Error> for Error {
    fn from(e: std::io::Error) -> Error {
        Error::Io(e)
    }
}

impl From<file::error::Error> for Error {
    fn from(e: file::error::Error) -> Error {
        Error::File(e)
    }
}

impl From<http::error::Error> for Error {
    fn from(e: http::error::Error) -> Error {
        Error::Network(e.to_string())
    }
}

impl From<reqwest::Error> for Error {
    fn from(e: reqwest::Error) -> Error {
        Error::Network(e.to_string())
    }
}

impl From<version::error::Error> for Error {
    fn from(e: version::error::Error) -> Error {
        Error::Version(e)
    }
}
