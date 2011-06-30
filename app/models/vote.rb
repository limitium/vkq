class Vote
  include Mongoid::Document
  field :rated, :type => Integer
  field :voter, :type => Integer
  field :value, :type => Integer
  field :timestamp, :type => Integer
  
  index :rated
  index :voter
end
