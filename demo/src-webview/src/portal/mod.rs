pub mod command;
pub mod file_system;
pub mod dir;
pub mod file;
pub mod rpc;

extern crate web_view;
use web_view::WebView;

use std::thread;

pub fn run_async<T: 'static, F: FnOnce() -> Result<String, String> + Send + 'static>(webview: &mut WebView<T>, what: F, callback: String, error: String) {
    let handle = webview.handle();
    thread::spawn(move || {
        let callback_string = rpc::format_callback_result(what(), callback, error);
        handle.dispatch(move |_webview| {
            _webview.eval(callback_string.as_str())
        }).unwrap()
    });
}