const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
            comment: {
                type: String,
            },
            rating: {
                type: Number,
                enum: [0, 1, 2, 3, 4, 5]
            },

            commentUser: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            vinoId: {
                type: Schema.Types.ObjectId,
                ref: "Vino"
            }
            });

        const CommentModel = model("Comment", commentSchema);

        module.exports = CommentModel;