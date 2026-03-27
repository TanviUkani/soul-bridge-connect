import { Award, Download, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const mockCertificates = [
  { id: "cert1", event: "Community Tree Plantation Drive", ngo: "Green Earth Foundation", date: "Mar 15, 2026", hours: 6, certNo: "SB-2026-0001" },
  { id: "cert2", event: "Code for Kids Workshop", ngo: "Digital Literacy India", date: "Feb 20, 2026", hours: 8, certNo: "SB-2026-0002" },
  { id: "cert3", event: "Beach Cleanup Marathon", ngo: "Ocean Warriors", date: "Jan 15, 2026", hours: 4, certNo: "SB-2026-0003" },
];

const Certificates = () => {
  const download = (certNo: string) => toast.success(`Certificate ${certNo} downloaded! (mock)`);
  const share = (certNo: string) => {
    navigator.clipboard.writeText(`https://soulbridge.app/verify/${certNo}`);
    toast.success("Certificate link copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" /> My Certificates
            </h1>
            <p className="text-muted-foreground">Digital certificates for completed events</p>
          </div>

          <div className="space-y-6">
            {mockCertificates.map((cert) => (
              <div key={cert.id} className="glass-card rounded-2xl overflow-hidden">
                {/* Certificate Preview */}
                <div className="gradient-hero p-8 text-center text-primary-foreground relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
                  <div className="relative">
                    <p className="text-xs tracking-[0.3em] uppercase opacity-80 mb-2">Certificate of Completion</p>
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-1">Soul Bridge</h3>
                    <p className="text-sm opacity-90">This certifies that <strong>Priya Sharma</strong></p>
                    <p className="text-sm opacity-90">has successfully completed</p>
                    <p className="font-heading font-bold text-lg mt-2">{cert.event}</p>
                    <p className="text-sm opacity-80 mt-1">organized by {cert.ngo}</p>
                    <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                      <span>📅 {cert.date}</span>
                      <span>⏱ {cert.hours} hours</span>
                    </div>
                    <p className="text-[10px] tracking-wider mt-4 opacity-60">Certificate No: {cert.certNo}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 flex gap-3">
                  <button onClick={() => download(cert.certNo)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button onClick={() => share(cert.certNo)} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Certificates;
