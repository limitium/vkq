class Vote
  include Mongoid::Document
  field :rated, :type => Integer
  field :voter, :type => Integer
  field :value, :type => Integer
  field :created_at, :type => Integer

  field :voterName, :type => String
  field :voterAva, :type => String
  field :voterRating, :type => String

  index :rated
  index :voter


  referenced_in :voter, :class_name => 'Queen', :inverse_of => :votes
  referenced_in :rated, :class_name => 'Queen', :inverse_of => :rates

  before_create :set_created_at

  protected
  def set_created_at
    self.created_at= Time.now.to_i
  end
end
