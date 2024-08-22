pub trait PCBAscii: Sized {
    fn from_str(ascii_data: &str) -> Vec<Self>;
}
