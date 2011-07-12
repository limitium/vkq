class Vote
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  field :rated, :type => Integer
  field :voter, :type => Integer
  field :value, :type => Integer


  
  index :rated
  index :voter
	

  referenced_in :voter, :class_name => 'Queen', :inverse_of => :votes
  referenced_in :rated, :class_name => 'Queen', :inverse_of => :rates


end
