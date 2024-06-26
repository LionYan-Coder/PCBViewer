use super::{
    declare::{Coordinate, Level, LineStyle, Size},
    enums::{Direction, Mirrored, Piece, Shape, Unit},
};

struct Partdcal {
    // Siemens 的 ASCII 文件中定义为 'PARTDECAL' 但是我好像找不到直译（拼写错误？）
    // /**
    //  * `*PARTDECAL* ITEMS` 数据块在电子设计自动化（EDA）文件中描述的是印刷电路板（PCB）上元器件的外形和布局信息。
    //  * `PARTDECAL` 可以理解为“元件封装标记”，通常用于定义一个元器件在PCB上的具体位置、形状、引脚位置及其他相关信息。
    //  */
    name: String,     //名称
    units: Unit,      //单位
    orix: Coordinate, //原点坐标
    oriy: Coordinate, //原点坐标
    pieces: u32,      //部件数量
    terminals: u32,   //端子数量
    stacks: u32,      //堆叠数量
    textnum: u8,      //文本数量
    labels: u8,       //标签数量

    piecetype: Piece,               //部件类型
    corners: u8,                    //角数量
    widthhght: u32,                 //宽高
    linestyle: LineStyle,           //线型
    level: Level,                   //层级
    restrictions: Vec<Restriction>, //部件坐标信息
    text: Text,                     //文本
    comment: Text,                  //标注
    pin: i32,                       // 引脚编号
    stacklines: u32,                //堆叠线数，表示这个焊盘在多少层上都有定义
    refdes: Vec<RefDes>,
    pads: Vec<Pad>,
}

struct Restriction {
    xloc: Coordinate, //x位置
    yloc: Coordinate, //y位置
}

struct Text {
    xloc: Coordinate,
    yloc: Coordinate,
    ori: f32,
    level: Level,
    heigth: u32,
    width: u32,
    mirrored: Mirrored,
    hjust: Direction,
    vjust: Direction,
    fontstyle: String,
    fontface: String,
}

struct RefDes {
    //起始坐标（X, Y）
    xloc: Coordinate,
    yloc: Coordinate,
    //结束坐标（X, Y）
    nmxloc: Coordinate,
    nmyloc: Coordinate,
    pinnumber: i32, //文本标注的层级或顺序号
}

struct Pad {
    // /**
    //  * PAD 部分描述了元器件的引脚或焊盘的信息。
    //  * 每个 PAD 定义了一个焊盘的具体属性，包括它的位置、大小、形状以及其他相关的参数。
    //  */
    level: Level,      //层级
    size: Size,        //焊盘的大小
    shape: Shape,      //焊盘的形状
    finori: f32,       //引脚方向
    finlength: u32,    //引脚长度
    finoffset: i32,    //引脚偏移
    cornerradius: u32, //角半径
    drill: u32,        //钻孔直径
}
