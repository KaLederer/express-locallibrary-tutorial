var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Wartung', 'Verfügbar', 'Verliehen', 'Reserviert'], default: 'Wartung'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual für Formatierung Datum
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_back).format('DD. MMM. YYYY');
});

// Virtual für Datum Y_M_D
BookInstanceSchema
.virtual('due_back_yyyy_mm_dd')
.get(function () {
  return moment(this.due_back).format('YYYY-MM-DD');
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);