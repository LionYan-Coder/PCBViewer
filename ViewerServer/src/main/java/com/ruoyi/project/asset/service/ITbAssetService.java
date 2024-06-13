package com.ruoyi.project.asset.service;

import java.util.List;
import com.ruoyi.project.asset.domain.TbAsset;

/**
 * 资产数据Service接口
 * 
 * @author ruoyi
 * @date 2024-06-12
 */
public interface ITbAssetService 
{
    /**
     * 查询资产数据
     * 
     * @param assetId 资产数据主键
     * @return 资产数据
     */
    public TbAsset selectTbAssetByAssetId(Long assetId);

    /**
     * 查询资产数据列表
     * 
     * @param tbAsset 资产数据
     * @return 资产数据集合
     */
    public List<TbAsset> selectTbAssetList(TbAsset tbAsset);

    /**
     * 新增资产数据
     * 
     * @param tbAsset 资产数据
     * @return 结果
     */
    public int insertTbAsset(TbAsset tbAsset);

    /**
     * 修改资产数据
     * 
     * @param tbAsset 资产数据
     * @return 结果
     */
    public int updateTbAsset(TbAsset tbAsset);

    /**
     * 批量删除资产数据
     * 
     * @param assetIds 需要删除的资产数据主键集合
     * @return 结果
     */
    public int deleteTbAssetByAssetIds(Long[] assetIds);

    /**
     * 删除资产数据信息
     * 
     * @param assetId 资产数据主键
     * @return 结果
     */
    public int deleteTbAssetByAssetId(Long assetId);
}
