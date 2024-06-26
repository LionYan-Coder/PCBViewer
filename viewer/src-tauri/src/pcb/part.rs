use super::{declare::Coordinate, enums::Mirrored};

struct Part {
    // /**
    //  * `*PART* ITEMS` 数据块在EDA文件中描述的是每个元件实例及其在电路板上的具体位置、方向、标签等信息
    //  */
    refnm: String,   //元件引用名称
    ptypenm: String, // 元件类型名称（包含封装信息)
    x: Coordinate,
    y: Coordinate,
    ori: f32,
    glue: String,     //是否使用胶水固定
    mirror: Mirrored, //镜像
    alt: i32,         //备用状态。
    clstid: u32,      //集群ID（通常为-1表示无集群）
    clstattr: u32,    //集群属性（通常为0）
    brotherid: u32,   //兄弟元件ID（通常为-1表示无兄弟元件）
    labels: u8,       //标签数
}
