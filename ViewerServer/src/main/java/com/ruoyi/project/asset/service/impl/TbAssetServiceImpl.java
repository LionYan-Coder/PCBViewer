package com.ruoyi.project.asset.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.asset.mapper.TbAssetMapper;
import com.ruoyi.project.asset.domain.TbAsset;
import com.ruoyi.project.asset.service.ITbAssetService;

/**
 * 资产数据Service业务层处理
 * 
 * @author ruoyi
 * @date 2024-06-12
 */
@Service
public class TbAssetServiceImpl implements ITbAssetService 
{
    @Autowired
    private TbAssetMapper tbAssetMapper;

    /**
     * 查询资产数据
     * 
     * @param assetId 资产数据主键
     * @return 资产数据
     */
    @Override
    public TbAsset selectTbAssetByAssetId(Long assetId)
    {
        return tbAssetMapper.selectTbAssetByAssetId(assetId);
    }

    /**
     * 查询资产数据列表
     * 
     * @param tbAsset 资产数据
     * @return 资产数据
     */
    @Override
    public List<TbAsset> selectTbAssetList(TbAsset tbAsset)
    {
        return tbAssetMapper.selectTbAssetList(tbAsset);
    }

    /**
     * 新增资产数据
     * 
     * @param tbAsset 资产数据
     * @return 结果
     */
    @Override
    public int insertTbAsset(TbAsset tbAsset)
    {
        tbAsset.setCreateTime(DateUtils.getNowDate());
        return tbAssetMapper.insertTbAsset(tbAsset);
    }

    /**
     * 修改资产数据
     * 
     * @param tbAsset 资产数据
     * @return 结果
     */
    @Override
    public int updateTbAsset(TbAsset tbAsset)
    {
        tbAsset.setUpdateTime(DateUtils.getNowDate());
        return tbAssetMapper.updateTbAsset(tbAsset);
    }

    /**
     * 批量删除资产数据
     * 
     * @param assetIds 需要删除的资产数据主键
     * @return 结果
     */
    @Override
    public int deleteTbAssetByAssetIds(Long[] assetIds)
    {
        return tbAssetMapper.deleteTbAssetByAssetIds(assetIds);
    }

    /**
     * 删除资产数据信息
     * 
     * @param assetId 资产数据主键
     * @return 结果
     */
    @Override
    public int deleteTbAssetByAssetId(Long assetId)
    {
        return tbAssetMapper.deleteTbAssetByAssetId(assetId);
    }
}
