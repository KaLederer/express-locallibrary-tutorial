var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;	
 
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for this author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual für Formatierung Datum Geburt
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('DD. MMM. YYYY') : '';
});

// Virtual für Formatierung Datum Tod
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('DD. MMM. YYYY') : '';
});

// Virtual für Lifespan formattiert
AuthorSchema
.virtual('lifespan_formatted')
.get(function () {
return (this.date_of_birth ? moment(this.date_of_birth).format('DD MMM YYYY'):'') + ' - ' + 
(this.date_of_death ? moment(this.date_of_death).format('DD MMM YYYY'):'');

})

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);