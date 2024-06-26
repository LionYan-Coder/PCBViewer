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

pub enum Direction {
    TOP,
    RIGHT,
    DOWN,
    LEFT,
}

pub enum Mirrored {
    N,  //不需要镜像
    Y,  //表示需要镜像。组件或布线将沿指定轴进行镜像翻转。
    X,  //表示沿X轴镜像。
    XY, //表示沿X轴和Y轴都进行镜像。
    H,  //水平镜像。
    V,  //垂直镜像。
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
