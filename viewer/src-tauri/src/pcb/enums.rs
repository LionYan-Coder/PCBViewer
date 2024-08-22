use serde::Serialize;
use strum_macros::{Display, EnumString};

pub enum Unit {
    // 2=Inches 1=Metric 0=Mils
    Mils,
    Metric,
    Inches,
}

pub enum ViaMode {
    Through, //通孔 (Through-Hole Via)
    Buried,  //埋孔 (Buried Via)：
    Blind,   //盲孔 (Blind Via)
    Micro,   //微盲孔 (Micro Via)
}

#[derive(Display, Debug, EnumString, Serialize)]
pub enum Direction {
    #[strum(serialize = "TOP")]
    TOP,
    #[strum(serialize = "RIGHT")]
    RIGHT,
    #[strum(serialize = "DOWN")]
    DOWN,
    #[strum(serialize = "LEFT")]
    LEFT,
}

#[derive(Display, Debug, EnumString, Serialize)]
pub enum Mirrored {
    #[strum(serialize = "N")]
    N, //不需要镜像
    #[strum(serialize = "Y")]
    Y, //表示需要镜像。组件或布线将沿指定轴进行镜像翻转。
    #[strum(serialize = "X")]
    X, //表示沿X轴镜像。
    #[strum(serialize = "XY")]
    XY, //表示沿X轴和Y轴都进行镜像。
    #[strum(serialize = "H")]
    H, //水平镜像。
    #[strum(serialize = "V")]
    V, //垂直镜像。
}

pub enum Piece {
    CIRCLE, //线条的类型是圆形
    OPEN,   //表示线条是开放
    CLOSED, //闭合
}

pub enum Shape {
    R,  // 圆形
    RF, // 填充圆形
}
