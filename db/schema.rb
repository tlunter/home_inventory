# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150518124538) do

  create_table "items", force: :cascade do |t|
    t.string  "name"
    t.string  "unit"
    t.decimal "amount"
  end

  create_table "items_tags", force: :cascade do |t|
    t.integer "item_id"
    t.integer "tag_id"
  end

  add_index "items_tags", ["item_id", "tag_id"], name: "unique_items_and_tags", unique: true

  create_table "tags", force: :cascade do |t|
    t.string "name"
  end

end
