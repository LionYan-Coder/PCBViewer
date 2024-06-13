-- 菜单 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据', '3', '1', 'asset', 'asset/asset/index', 1, 0, 'C', '0', '0', 'asset:asset:list', '#', 'admin', sysdate(), '', null, '资产数据菜单');

-- 按钮父菜单ID
SELECT @parentId := LAST_INSERT_ID();

-- 按钮 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据查询', @parentId, '1',  '#', '', 1, 0, 'F', '0', '0', 'asset:asset:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据新增', @parentId, '2',  '#', '', 1, 0, 'F', '0', '0', 'asset:asset:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据修改', @parentId, '3',  '#', '', 1, 0, 'F', '0', '0', 'asset:asset:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据删除', @parentId, '4',  '#', '', 1, 0, 'F', '0', '0', 'asset:asset:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('资产数据导出', @parentId, '5',  '#', '', 1, 0, 'F', '0', '0', 'asset:asset:export',       '#', 'admin', sysdate(), '', null, '');