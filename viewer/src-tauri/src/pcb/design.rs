use super::{
    declare::Size,
    enums::{Unit, ViaMode},
};

struct Design {
    units: Unit,                      //单位
    usergrid: u16,                    //用户网格点之间的间距
    maximumlayer: u8,                 //最大布线层数
    worklevel: u8,                    //项目创建时使用的工作层
    displaylevel: i8,                 //用于显示工作层的开关
    layerpair: u8,                    //用于路由连接的层对，为1和2。
    viamode: ViaMode,                 //层间连接使用的过孔类型
    linewidth: u32,                   // 创建项目时使用的线宽
    textsize: Size,                   //创建文本时使用的高度和线宽
    jobtime: u32,                     // 在此PCB设计上花费的时间
    dotgrid: u32,                     //图形点之间的间距
    scale: u8,                        //窗口缩放比例
    origin: (i32, i32),               // 用户定义的原点位置
    windowcenter: (i32, i32),         // 定义窗口中心的点
    realwidth: i32,                   //显示真实大小的宽度
    refnamesize: (Size, Size),        //部件参考名称使用的高度和线宽
    hatchgrid: u32,                   // 铜箔浇注网格的间距
    teardrop: u32,                    //泪滴状轨迹
    therlinewid: u32,                 //铜箔浇注的热线宽度
    psviagrid: u32,                   //推拉过孔网格的间距
    padfillwid: u32,                  //CAM手指焊盘填充宽度
    thersmdwid: u32,                  //SMD的铜箔浇注的热线宽度
    minhatarea: u32,                  //最小的网格面积
    hatchdisp: i8,                    // 网格显示标志
    drillhole: u32,                   //钻孔检查间距
    hatchrad: f32,                    // 网格轮廓平滑半径
    mitreang: u32,                    //倒角角度的值
    hatchang: u32,                    // 网格角度
    drloversize: Size,                //镀孔钻孔的过大尺寸
    planerad: u32,                    //平面轮廓平滑半径
    compheight: u32,                  //板顶部件高度限制
    kpthatchgrid: u32,                //铜箔浇注网格间距
    botcmpheight: u32,                //板底部件高度限制
    fanoutgrid: u32,                  //扇出网格的间距
    fanoutlength: u32,                //最大扇出长度
    routerflags: u32,                 //自动布线器的特定标志
    verifyflags: u32,                 // 设计验证标志，为1861
    fabchkflags: u32,                 // 制造检查标志，为3967
    atmaxsize: Size,                  // 酸陷阱的最大尺寸，为114300
    atmaxangle: u32,                  // 酸陷阱的最大角度，为161999820
    slmincopper: u32,                 // 最小铜箔宽度，为114300
    slminmask: u32,                   // 最小掩膜宽度，为114300
    stminclear: u32,                  // 饥饿热力的最小间隙，为5
    stminspokes: u32,                 // 饥饿热力的最小辐条数，为4
    tpminwidth: u32,                  // 最小轨迹宽度，为114300
    tpminsize: Size,                  // 最小焊盘尺寸，为114300
    ssmingap: u32,                    // 丝印掩膜的最小间隙，为114300
    sbmingap: u32,                    // 焊桥的最小间隙，为114300
    sblayer: u8,                      // 焊桥层，为1
    arptom: u32,                      // 焊盘到掩膜的环宽，为114300
    arptomlayer: u8,                  // 焊盘到掩膜的环层，为1
    ardtom: u32,                      // 钻孔到掩膜的环宽，为114300
    ardtomlayer: u8,                  // 钻孔到掩膜的环层，为1
    ardtop: u32,                      // 钻孔到焊盘的环宽，为114300
    ardtoplayer: u8,                  // 钻孔到焊盘的环层，为0
    viapspacing: u32,                 // 过孔图案的过孔间距，为0
    viapshape: u32,                   // 过孔图案的形状间距，为0
    viaptotrace: u32,                 // 过孔图案的边缘间距，为0
    viapfill: u32,                    // 过孔图案的填充类型，为0
    viapshsig: String,                // 过孔图案的信号，为NONE
    viapshvia: String,                // 过孔图案的过孔，为NONE
    viapflag: u32,                    // 过孔图案的标志，为0
    flowflags: u32,                   // 流程标志，为0
    osnap: u32,                       // 对象捕捉标志，为502
    osnaprad: u32,                    // 对象捕捉半径，为952500
    bottomview: u32,                  // 底视图标志，为0
    plnsepgap: u32,                   // 平面分离间隙，为0
    idfshapelay: u32,                 // IDF形状层，为0
    associatednetnetcount: u32,       // 关联网络的数量，为5
    associatednetplanepincount: u32,  // 关联网络的平面引脚数，为25
    associatednetprefix: [String; 5], // 关联网络的前缀（共有5个）
    teardropdata: (u32, u32),         // 泪滴数据，值为90和90
}
