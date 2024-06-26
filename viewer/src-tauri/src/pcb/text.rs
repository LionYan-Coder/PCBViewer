use super::{
    declare::{Coordinate, Level},
    enums::{Direction, Mirrored},
};

struct Text {
    xloc: Coordinate,   //x位置
    yloc: Coordinate,   //y位置
    ori: f32,           //方向
    level: Level,       //层级
    height: u32,        //高度
    width: u32,         //宽度
    mirrored: Mirrored, //镜像
    hjust: Direction,   //水平对齐
    vjust: Direction,   //垂直对齐
    instancenm: String, //实例名称
    fontstyle: String,  //字体样式
    fontface: String,   // 字体
    reuse: i8,          //重用
}
