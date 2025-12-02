import React, { useState } from "react";
import {
  Camera,
  School,
  Mail,
  Phone,
  MapPin,
  Home,
  Plus,
  Grid,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock data for demonstration
const initialSchools = [
  {
    id: 1,
    name: "Greenwood International School",
    address: "123 Education Lane",
    city: "Mumbai",
    state: "Maharashtra",
    contact: "9876543210",
    email_id: "info@greenwood.edu",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
  },
  {
    id: 2,
    name: "Sunrise Academy",
    address: "456 Learning Street",
    city: "Delhi",
    state: "Delhi",
    contact: "9876543211",
    email_id: "contact@sunrise.edu",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400",
  },
  {
    id: 3,
    name: "Blue Mountain School",
    address: "789 Knowledge Road",
    city: "Bangalore",
    state: "Karnataka",
    contact: "9876543212",
    email_id: "hello@bluemountain.edu",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
  },
];

const AddSchoolForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "School name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email is required";
    } else if (!emailRegex.test(formData.email_id)) {
      newErrors.email_id = "Invalid email format";
    }

    if (!formData.image) newErrors.image = "School image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit({
      ...formData,
      image: imagePreview,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(false);
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        email_id: "",
        image: null,
      });
      setImagePreview(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <School className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Add New School</h1>
            </div>
            <p className="text-indigo-100">
              Fill in the details to register a school
            </p>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 rounded-lg animate-slideIn">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-800">Success!</p>
                  <p className="text-green-600 text-sm">
                    School added successfully
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-8 space-y-6">
            {/* School Name */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                School Name *
              </label>
              <div className="relative">
                <School className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter school name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address *
              </label>
              <div className="relative">
                <Home className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                    errors.address
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter full address"
                />
              </div>
              {errors.address && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.address}</span>
                </div>
              )}
            </div>

            {/* City and State */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                      errors.city
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Enter city"
                  />
                </div>
                {errors.city && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.city}</span>
                  </div>
                )}
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                    errors.state
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.state}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                      errors.contact
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="10 digit number"
                  />
                </div>
                {errors.contact && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.contact}</span>
                  </div>
                )}
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                      errors.email_id
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="school@example.com"
                  />
                </div>
                {errors.email_id && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email_id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                School Image *
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 ${
                  errors.image ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-48 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium">
                        Click to upload school image
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {errors.image && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-slideIn">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.image}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-indigo-700 hover:to-purple-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding School...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add School</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                View Schools
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowSchools = ({ schools, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold mb-2 flex items-center gap-3">
                <School className="w-12 h-12" />
                Schools Directory
              </h1>
              <p className="text-blue-100 text-lg">
                Discover and explore educational institutions
              </p>
            </div>
            <button
              onClick={onAddNew}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              Add New School
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-2">
          <input
            type="text"
            placeholder="Search schools by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredSchools.length === 0 ? (
          <div className="text-center py-20">
            <School className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl font-medium">
              No schools found
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or add a new school
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 text-lg">
                <span className="font-bold text-2xl text-gray-800">
                  {filteredSchools.length}
                </span>{" "}
                {filteredSchools.length === 1 ? "school" : "schools"} found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  onMouseEnter={() => setHoveredId(school.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredId === school.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                      {school.name}
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2 text-gray-600">
                        <Home className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                        <span className="text-sm line-clamp-2">
                          {school.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-blue-500" />
                        <span className="text-sm font-medium">
                          {school.city}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mt-5 pt-4 border-t border-gray-100 transform transition-all duration-300 ${
                        hoveredId === school.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState("show");
  const [schools, setSchools] = useState(initialSchools);

  const handleAddSchool = (newSchool) => {
    const schoolWithId = {
      ...newSchool,
      id: schools.length + 1,
    };
    setSchools((prev) => [...prev, schoolWithId]);
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {currentPage === "add" ? (
        <AddSchoolForm
          onSubmit={handleAddSchool}
          onCancel={() => setCurrentPage("show")}
        />
      ) : (
        <ShowSchools schools={schools} onAddNew={() => setCurrentPage("add")} />
      )}
    </>
  );
}
