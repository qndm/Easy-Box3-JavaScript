/**
 * ### Easy Box3 JavaScript
 * 一款适用于Box3的辅助用代码，包含一些常用代码
 */
const EBJS = {
    /**
     * 无限执行一段代码
     * @param {function} toDo 执行的代码
     * @param {number} waitTime 间隔的时间，单位为ms，最小是64（防崩溃）
     */
    executeForever: async function(toDo, waitTime) {
        var ms = waitTime;
        while (true) {
            try {
                toDo();
                ms = waitTime;
                await sleep(Math.min(ms, 64));
            } catch (error) {
                if (error.includes('Script execution timed out.')) {
                    console.warn('脚本执行超时，已自动增加间隔');
                    ms += 64;
                }
            }
        }
    },
    /**
     * 适用于Box3的EBJS
     */
    Box3: {
        /**
         * 使用实体ID获取一个实体
         * @param {string} id 实体ID
         * @returns {Box3Entity} 获取的实体
         */
        getEntity: function(id) {
            var entity = world.querySelector('#' + id);
            if (entity) return entity;
            else console.warn('错误：没有ID为', id, '的实体');
        },
        /**
         * 使用实体标签获取一组实体
         * @param {string} tag 实体标签
         * @returns {Box3Entity[]} 获取的实体列表
         */
        getEntities: function(tag) {
            var entities = world.querySelectorAll('.' + tag);
            if (entities.length > 0) return entities;
            else console.warn('错误：没有标签为', tag, '的实体');
        },
        /**
         * 使用Box3的选择器接口获取一个实体
         * @param {Box3SelectorString} selector Box3的选择器接口
         * @returns {Box3Entity} 获取的实体
         */
        getEntityByBox3SelectorString: function(selector) {
            var entity = world.querySelector(selector);
            if (entity) return entity;
            else console.warn('错误：没有选择器为', selector, '的实体');
        },
        /**
         * 使用Box3的选择器接口获取一组实体
         * @param {Box3SelectorString} selector 实体标签
         * @returns {Box3Entity[]} 获取的实体列表
         */
        getEntitiesByBox3SelectorString: function(selector) {
            var entities = world.querySelectorAll(selector);
            if (entities.length > 0) return entities;
            else console.warn('错误：没有选择器为', selector, '的实体');
        },
        /**
         * 使用Box3Vector3设置方块（使用`setVoxelId`）
         * @param {Box3Vector3} position 指定的位置
         * @param {number | string} voxel 方块，可为ID或者名称
         * @returns {number} 更新后的方块ID
         */
        setVoxelByBox3Vector3: function(position, voxel) {
            return voxels.setVoxelId(position.x, position.y, position.z, typeof voxel == "number" ? voxel : voxels.id(voxel));
        },
        /**
         * 使用Date对象设置太阳位置
         * @param {Date} date 时间
         * @param {boolean} autoChange 是否自动+8小时，默认true，可以在控制台执行以下代码判断是否需要：
         * ```javascript
         * console.log(new Date().getHours());
         * ```
         * @param {boolean} fixed 是否是固定的，默认false
         * @returns {number} 更新后的太阳位置
         */
        setSunPhaseByDate: function(date, autoChange = true) {
            world.lightMod = 'natural'; //需要natural模式才能生效
            var hours = date.getHours() + (autoChange ? 8 : 0) - 6;
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            world.sunPhase = (hours * 60 * 60 + minutes * 60 + seconds) / (60 * 60 * 24);
            return world.sunPhase;
        },
        /**
         * 使用Date对象设置月相
         * @param {Date} date 日期
         * @returns {number} 更新后的月相
         */
        setLunarPhase: function(date) {
            var days = date.getDate();
            world.lunarPhase = 1 - (days % 30) / 30;
            return world.lunarPhase;
        }
    }
}
