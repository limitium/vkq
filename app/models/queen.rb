class Queen
  include Mongoid::Document
  identity :type => Integer
  field :first_name, :type => String
  field :last_name, :type => String
  field :photo, :type => String
  key :_id
end
