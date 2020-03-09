const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// 虚拟属性'name'：表示作者全名
AuthorSchema
  .virtual('name')
  .get(function () {
    if(/[a-zA-Z]/g.test(this.first_name) && /[a-zA-Z]/g.test(this.family_name)) return this.first_name + '·' + this.family_name;
    return `${this.family_name}${this.first_name}`;
  });
AuthorSchema.virtual('date_of_birth_format').get(function() {
  if (!this.date_of_birth) return null;
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});
AuthorSchema.virtual('date_of_death_format').get(function() {
  if (!this.date_of_death) return null;
  return moment(this.date_of_death).format('YYYY-MM-DD');
});
// 虚拟属性'lifespan'：作者寿命
AuthorSchema
  .virtual('lifespan')
  .get(function () {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  });

// 虚拟属性'url'：作者 URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });


// 导出 Author 模型
module.exports = mongoose.model('Author', AuthorSchema, 'authors');