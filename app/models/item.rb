# == Schema Information
#
# Table name: items
#
#  id     :integer          not null, primary key
#  name   :string
#  unit   :string
#  amount :decimal(, )
#

class Item < ActiveRecord::Base
  has_and_belongs_to_many :tags
end
