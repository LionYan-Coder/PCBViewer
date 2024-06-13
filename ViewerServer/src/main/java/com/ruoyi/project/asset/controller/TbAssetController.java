package com.ruoyi.project.asset.controller;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.asset.domain.TbAsset;
import com.ruoyi.project.asset.service.ITbAssetService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;

/**
 * 资产数据Controller
 * 
 * @author ruoyi
 * @date 2024-06-13
 */
@RestController
@RequestMapping("/asset/asset")
public class TbAssetController extends BaseController
{
    @Autowired
    private ITbAssetService tbAssetService;

    /**
     * 查询资产数据列表
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:list')")
    @GetMapping("/list")
    public AjaxResult list(TbAsset tbAsset)
    {
        List<TbAsset> list = tbAssetService.selectTbAssetList(tbAsset);
        return success(list);
    }

    /**
     * 导出资产数据列表
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:export')")
    @Log(title = "资产数据", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, TbAsset tbAsset)
    {
        List<TbAsset> list = tbAssetService.selectTbAssetList(tbAsset);
        ExcelUtil<TbAsset> util = new ExcelUtil<TbAsset>(TbAsset.class);
        util.exportExcel(response, list, "资产数据数据");
    }

    /**
     * 获取资产数据详细信息
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:query')")
    @GetMapping(value = "/{assetId}")
    public AjaxResult getInfo(@PathVariable("assetId") Long assetId)
    {
        return success(tbAssetService.selectTbAssetByAssetId(assetId));
    }

    /**
     * 新增资产数据
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:add')")
    @Log(title = "资产数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody TbAsset tbAsset)
    {
        return toAjax(tbAssetService.insertTbAsset(tbAsset));
    }

    /**
     * 修改资产数据
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:edit')")
    @Log(title = "资产数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody TbAsset tbAsset)
    {
        return toAjax(tbAssetService.updateTbAsset(tbAsset));
    }

    /**
     * 删除资产数据
     */
    @PreAuthorize("@ss.hasPermi('asset:asset:remove')")
    @Log(title = "资产数据", businessType = BusinessType.DELETE)
	@DeleteMapping("/{assetIds}")
    public AjaxResult remove(@PathVariable Long[] assetIds)
    {
        return toAjax(tbAssetService.deleteTbAssetByAssetIds(assetIds));
    }
}
