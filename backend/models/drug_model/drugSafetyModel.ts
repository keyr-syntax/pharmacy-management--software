const DrugSafety = sequelize.define('DrugSafety', {
  drugSafetyID: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  drugID: { type: DataTypes.UUID, allowNull: false, references: { model: 'Drugs', key: 'drugID' } },
  contraindications: { type: DataTypes.TEXT, allowNull: true },
  
  drugInteractions: { type: DataTypes.TEXT, allowNull: true },
  pregnancyCategory: { type: DataTypes.STRING, allowNull: false }, // e.g., A, B, C, D, X
  maxDailyDose: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });
