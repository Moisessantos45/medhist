// type Appointment struct {
// 	ID        uint64    `gorm:"primaryKey" json:"id"`
// 	Date      time.Time `gorm:"not null;index" json:"date"`
// 	Reason    string    `gorm:"type:text" json:"reason"`
// 	Status    string    `gorm:"type:varchar(20);default:'scheduled'" json:"status"` // scheduled, completed, canceled
// 	Notes     string    `gorm:"type:text" json:"notes"`
// 	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
// 	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

// 	PatientID      uint64 `gorm:"not null;index" json:"patient_id"`
// 	VeterinarianID uint64 `gorm:"not null;index" json:"veterinarian_id"`

// 	Patient      Patient      `gorm:"foreignKey:PatientID;references:ID"`
// 	Veterinarian Veterinarian `gorm:"foreignKey:VeterinarianID;references:ID"`
// }

interface Appointment {
  id: number;
  date: Date; // ISO format date string
  reason: string;
  status: "scheduled" | "completed" | "canceled";
  notes: string;
  created_at: Date; // ISO format date string
  updated_at: Date; // ISO format date string
  patient_id: number;
  veterinarian_id: number;
}

const initialAppointment: Appointment = {
  id: 0,
  date: new Date(),
  reason: "",
  status: "scheduled",
  notes: "",
  created_at: new Date(),
  updated_at: new Date(),
  patient_id: 0,
  veterinarian_id: 0,
};

export { initialAppointment, type Appointment };
