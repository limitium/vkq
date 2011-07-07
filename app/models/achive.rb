class Achive
  include Mongoid::Document
  field :name, :type => String
  field :description, :type => String
  field :icon, :type => String
  field :users_have, :type => Integer
end
