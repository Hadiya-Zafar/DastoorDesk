class EvidenceMapper:
    def __init__(self):
        # Using your detailed, professional Pakistani legal terminology
        self.mapping = {
            "property": [
                "Fard-e-Malkiat (Latest Record of Rights)",
                "Original Registry / Sale Deed (Baya-Nama)",
                "Inteqal (Mutation) document copy",
                "Aks-Shajra (Certified map from Patwari)",
                "Stay Order copy (from Civil Court if applicable)",
                "Latest Electricity/Gas bills for possession proof"
            ],
            "cybercrime": [
                "Digital Screenshots of offending messages/posts",
                "Original Device (Phone/Laptop/SIM card)",
                "URL/Link to the suspect's social media profile",
                "Bank Statement / Transaction ID (for financial fraud)",
                "Email Headers (for phishing cases)"
            ],
            "traffic": [
                "Original Traffic Challan copy",
                "Valid Driving License",
                "Vehicle Registration Book / Smart Card",
                "Vehicle Insurance Certificate",
                "CCTV or Dashcam footage (if available)"
            ],
            "consumer": [
                "Original Purchase Receipt / Tax Invoice",
                "Warranty Card (stamped by the seller)",
                "Photos/Videos of the defective product",
                "Legal Notice sent to the company",
                "Company's written response (if any)"
            ],
            "family": [
                "Nikahnama (Registered with Union Council)",
                "Marriage Certificate (NADRA Computerized)",
                "Birth Certificates of children (NADRA)",
                "Union Council Divorce/Khula Decree",
                "Proof of Maintenance / Pay slips of spouse"
            ],
            "labour": [
                "Appointment Letter / Employment Contract",
                "Salary Slips / Bank Transfer records",
                "Experience Letter / Termination Notice",
                "EOBI or SESSI Registration cards",
                "Attendance or Overtime records"
            ],
            "criminal": [
                "Certified Copy of FIR (First Information Report)",
                "Medico-Legal Report (MLR) for injuries",
                "List of Eye-witnesses and contact info",
                "Bail Bond documents",
                "Post-mortem report (for homicide cases)"
            ],
            "constitutional": [
                "Copy of the Application filed in High Court",
                "Affidavits from witnesses",
                "Evidence of Fundamental Rights violation (Art 8-28)",
                "Previous court orders or stay notices"
            ]
        }

    def get_evidence_checklist(self, department_id):
        # Matches the dropdown ID from the frontend
        return self.mapping.get(department_id.lower(), ["CNIC Copy", "Written Application", "Relevant Media"])

evidence_mapper = EvidenceMapper()