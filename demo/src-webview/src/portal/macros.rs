/// Helper for formatting `errors::Error`s
macro_rules! format_err {
    ($e_type:expr, $literal:expr) => {
        $e_type(format!($literal))
    };
    ($e_type:expr, $literal:expr, $($arg:expr),*) => {
        $e_type(format!($literal, $($arg),*))
    };
}

/// Helper for formatting `errors::Error`s and returning early
macro_rules! bail {
    ($e_type:expr, $literal:expr) => {
        return Err(format_err!($e_type, $literal))
    };
    ($e_type:expr, $literal:expr, $($arg:expr),*) => {
        return Err(format_err!($e_type, $literal, $($arg),*))
    };
}
