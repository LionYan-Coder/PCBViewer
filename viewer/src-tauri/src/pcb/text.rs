use std::str::FromStr;

use super::{
    declare::{Coordinate, Level},
    enums::{Direction, Mirrored},
};
use crate::pcb::lib::PCBAscii;
use regex::Regex;
use serde::Serialize;

const ASCII_TEXT_CONTENT_RE: &str = r"\*TEXT\*\s*FREE\sTEXT\s*\*REMARK\* XLOC YLOC ORI LEVEL HEIGHT WIDTH MIRRORED HJUST VJUST \.REUSE\. INSTANCENM\s*\*REMARK\* FONTSTYLE FONTFACE\s*(?:\s*(\d+)\s+(\d+)\s+(\d+\.\d{3})\s+(\d+)\s+(\d+)\s+(\d+)\s+([NY])\s+(LEFT|RIGHT|CENTER)\s+(UP|DOWN|CENTER)\s+(\d+)\s*([^\s,]+),H=(\d+),D=(\d+)\s+(\S+)\s*(\S+)+\s*)+";
const ASCII_TEXT_DATA_RE: &str = r"\s*(\d+)\s+(\d+)\s+(\d+\.\d{3})\s+(\d+)\s+(\d+)\s+(\d+)\s+([NY])\s+(LEFT|RIGHT|CENTER)\s+(UP|DOWN|CENTER)\s+(\d+)\s*([^\s,]+),H=(\d+),D=(\d+)\s+([^\s]+)\s*(\S+)+";

#[derive(Serialize, Debug)]
pub struct ASCIIText {
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
}

impl PCBAscii for ASCIIText {
    fn from_str(ascii_data: &str) -> Vec<Self> {
        let mut texts: Vec<Self> = Vec::new();
        let text_content_re = Regex::new(ASCII_TEXT_CONTENT_RE).unwrap();

        // 使用 .find_iter 来匹配多个部分
        for content_match in text_content_re.find_iter(ascii_data) {
            let content_str = content_match.as_str();
            let section_re = Regex::new(ASCII_TEXT_DATA_RE).unwrap();
            for captures in section_re.captures_iter(content_str) {
                for i in (1..captures.len()).step_by(captures.len() - 1) {
                    let ascii_text = ASCIIText {
                        xloc: captures[i].parse::<isize>().unwrap(),
                        yloc: captures[i + 1].parse::<isize>().unwrap(),
                        ori: captures[i + 2].parse::<f32>().unwrap(),
                        level: captures[i + 3].parse::<i32>().unwrap(),
                        height: captures[i + 4].parse::<u32>().unwrap(),
                        width: captures[i + 5].parse::<u32>().unwrap(),
                        mirrored: Mirrored::from_str(&captures[i + 6]).unwrap(),
                        hjust: Direction::from_str(&captures[i + 7]).unwrap(),
                        vjust: Direction::from_str(&captures[i + 8]).unwrap(),
                        instancenm: captures[i + 9].to_string(),
                        fontstyle: format!(
                            "{},H={},D={}",
                            &captures[i + 10],
                            &captures[i + 11],
                            &captures[i + 12]
                        ),
                        fontface: captures[i + 14].to_string(),
                    };

                    texts.push(ascii_text);
                }
            }
        }

        texts
    }
}
