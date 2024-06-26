use super::{
    declare::{Coordinate, Level, LineStyle},
    enums::Piece,
};

struct Line {
    name: String,                       //名称
    r#type: String,                     //类型
    xloc: Coordinate,                   //x位置
    yloc: Coordinate,                   //y位置
    pieces: u8,                         //段数
    text: String,                       //文本
    sigstr: String,                     //信号字符串
    piecetype: Piece,                   //线条类型
    corners: u8,                        //角数量
    widthhght: u32,                     //宽高
    linestyle: LineStyle,               //线条样式
    level: Level,                       //层级
    restrictions: Vec<LineRestriction>, //限制条件（
}

struct LineRestriction {
    xloc: Coordinate, //x位置
    yloc: Coordinate, //y位置
}
