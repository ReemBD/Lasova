const { Schema, model } = require("mongoose");

const Group = new Schema({
    type: { type: String, default: "", trim: true },
    name: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    contactEmail: { type: String, default: "", trim: true },
    contactName: { type: String, default: "", trim: true },
    contactRole: { type: String, default: "", trim: true },
    contactCellphone: { type: String, default: "", trim: true },
    volunteersCount: { type: Number, default: 0 },
    reportedHours: { type: Number, default: 0 },
    volunteeringsCount: { type: Number, default: 0 },
});

module.exports = new model("Group", Group);
