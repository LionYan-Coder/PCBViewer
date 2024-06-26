use super::{
    declare::{Level, Size},
    enums::Shape,
};

struct Via {
    // /**
    //  * VIA的数据块提供了关于VIA（过孔）的一系列详细信息，
    //  * 包括名称、钻孔直径、堆叠层数、层级、尺寸、形状等参数。
    //  * 这些信息用于描述PCB设计中VIA的属性和布局
    //  */
    name: String,   //钻孔名称
    drill: u32,     //钻孔直径
    stacklines: u8, //贯穿层数
    items: Vec<ViaItem>,
}

struct ViaItem {
    level: Level,
    size: Size,
    shape: Shape,
}
