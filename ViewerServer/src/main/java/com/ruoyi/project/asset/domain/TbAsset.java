package com.ruoyi.project.asset.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

/**
 * 资产数据对象 tb_asset
 * 
 * @author ruoyi
 * @date 2024-06-12
 */
public class TbAsset extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 资产ID */
    private Long assetId;

    /** 资产名称 */
    @Excel(name = "资产名称")
    private String assetName;

    /** 资产类型（DIR PDF PCB GBR BRD） */
    @Excel(name = "资产类型", readConverterExp = "D=IR,P=DF,P=CB,G=BR,B=RD")
    private String assetType;

    /** 父资产 */
    @Excel(name = "父资产")
    private Long parentId;

    /** 资产状态（0显示 1隐藏） */
    @Excel(name = "资产状态", readConverterExp = "0=显示,1=隐藏")
    private Long visible;

    /** 显示顺序 */
    @Excel(name = "显示顺序")
    private Long sort;

    /** 是否需要vip查看（0否 1是） */
    @Excel(name = "是否需要vip查看", readConverterExp = "0=否,1=是")
    private Long vip;

    public void setAssetId(Long assetId) 
    {
        this.assetId = assetId;
    }

    public Long getAssetId() 
    {
        return assetId;
    }
    public void setAssetName(String assetName) 
    {
        this.assetName = assetName;
    }

    public String getAssetName() 
    {
        return assetName;
    }
    public void setAssetType(String assetType) 
    {
        this.assetType = assetType;
    }

    public String getAssetType() 
    {
        return assetType;
    }
    public void setParentId(Long parentId) 
    {
        this.parentId = parentId;
    }

    public Long getParentId() 
    {
        return parentId;
    }
    public void setVisible(Long visible) 
    {
        this.visible = visible;
    }

    public Long getVisible() 
    {
        return visible;
    }
    public void setSort(Long sort) 
    {
        this.sort = sort;
    }

    public Long getSort() 
    {
        return sort;
    }
    public void setVip(Long vip) 
    {
        this.vip = vip;
    }

    public Long getVip() 
    {
        return vip;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("assetId", getAssetId())
            .append("assetName", getAssetName())
            .append("assetType", getAssetType())
            .append("parentId", getParentId())
            .append("visible", getVisible())
            .append("sort", getSort())
            .append("vip", getVip())
            .append("createBy", getCreateBy())
            .append("createTime", getCreateTime())
            .append("updateBy", getUpdateBy())
            .append("updateTime", getUpdateTime())
            .append("remark", getRemark())
            .toString();
    }
}
