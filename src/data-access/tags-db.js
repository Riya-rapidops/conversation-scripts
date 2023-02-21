const TABLE_NAME = 'tags';

function makeTagsDb({mysqlQuery}) {
    
    return async function createTags(data) {
        const query = `INSERT INTO ${TABLE_NAME}
        (tag_id,type,name,applied_at,applied_by_type,applied_by_id,createdAt,updatedAt) VALUES (?,?,?,?,?,?,NOW(),NOW())`;
        const values = [
            data.id,
            data.type,
            data.name,
            new Date(data.applied_at*1000),
            data.applied_by_type,
            data.applied_by_id
        ];

        const tag = await tagExists(data.id);
        if(tag && tag.length>0){
            return tag[0].id;
        }else{
            const res = await mysqlQuery(query,values)
            return res.insertId
        }
        
    }
    async function tagExists(tagId) {
        const query = `select * from ${TABLE_NAME} where tag_id = ${tagId}`
        const tag = await mysqlQuery(query);
        return tag;
    }

}

module.exports = makeTagsDb;
