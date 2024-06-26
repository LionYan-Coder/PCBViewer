struct Route {
    signal: Signal,
    segments: Vec<Segment>,
}

#[derive(Debug)]
struct Signal {
    signame: String,              //信号名称
    sigflag: u32,                 //信号标志
    color: u32,                   //信号颜色
    connections: Vec<Connection>, // 连接信息列表
}

#[derive(Debug)]
struct Connection {
    refnm_pin: String, //元件引用名及引脚
    rsig: String,      //复用实例
}

#[derive(Debug)]
struct Segment {
    xloc: i64,                                         // X 位置
    yloc: i64,                                         // Y 位置
    layer: u32,                                        // 层级
    segmentwidth: u32,                                 // 线宽
    flags: u32,                                        // 标志
    arcdir_vianame: Option<String>,                    // 弧方向或过孔名称
    teardrop: Option<Teardrop>,                        // 泪滴信息
    jmpnm_jmpflag: Option<(String, u32)>,              // 跳转名称与标志
    reuse_inst_rsig: Option<(String, String, String)>, // 复用实例与信号
}

#[derive(Debug)]
struct Teardrop {
    p_wid_len_flags: Option<(u32, u32, u32, u32)>, // P 端宽度长度标志
    n_wid_len_flags: Option<(u32, u32, u32, u32)>, // N 端宽度长度标志
}
