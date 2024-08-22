struct PartType {
    // /**
    //  * 数据块在EDA文件中描述的是PCB设计中元器件的类型及其引脚信息。
    //  */
    name: String,     //**：元件名称
    decalnm: String,  //元件封装名称 对应 `*PARTDECAL*` 中的封装信息
    r#type: Type,     //元件类型
    gates: u8,        //元件中逻辑门的数量
    sigpins: u8,      //信号引脚数
    unusedpinnms: u8, //未使用的引脚名称
    flags: u8,        //标志位，用于表示元件的特殊属性
    eco: String,      //程变更令
    gs: GS,
    swaptype: i8,
    pins: u8, //引脚数
    pinnumbers: Vec<String>, // 所有引脚
              //1.0.L. 2.0.L. 3.0.L. 4.0.L. 5.0.L. 6.0.L.
}

enum Type {
    UND, //未定义
    R,   //电阻
    C,   //电容
    D,   //二极管
    Q,   //晶体管
    U,   //集成电路
    L,   //电感
    F,   //保险丝
    K,   //继电器
    J,   //连接器
    TP,  //测试点
    SW,  //开关
    LED, //发光二极管
}

enum GS {
    G, //门
    S, //信号
}
