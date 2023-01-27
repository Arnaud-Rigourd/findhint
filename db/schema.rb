# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_27_122138) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "content"
    t.bigint "enigma_id", null: false
    t.index ["enigma_id"], name: "index_answers_on_enigma_id"
  end

  create_table "chats", force: :cascade do |t|
    t.bigint "enigma_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "origin", default: true
    t.string "content"
    t.index ["enigma_id"], name: "index_chats_on_enigma_id"
  end

  create_table "enigmas", force: :cascade do |t|
    t.text "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "origin"
  end

  add_foreign_key "answers", "enigmas"
  add_foreign_key "chats", "enigmas"
end
