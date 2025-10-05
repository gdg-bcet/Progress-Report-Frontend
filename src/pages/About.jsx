import React from 'react';
import {
  CheckCircle,
  Award,
  Users,
  Mail,
  MessageCircle,
  Globe,
  Instagram,
  Linkedin,
  Phone,
  ExternalLink,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamMemberCard from '@/components/TeamMemberCard';
import icon from '/icon.png';

const About = () => {
  // Team data structure
  const leadOrganizer = {
    name: 'Sayan Barma',
    role: 'GDGoC Organizer',
    image:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sayan_barma_l7COUW7.png',
    social: {
      linkedin: 'http://linkedin.com/in/sayan-barma-ab0973289/',
      github: 'https://github.com/N00BSC00B',
      portfolio: 'https://sayan-barma-portfolio.netlify.app/',
    },
  };

  const coreTeam = [
    {
      name: 'Arjab Mukherjee',
      role: 'Community Manager',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/arnab_mukherjee_xOHzYKw.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/0xarnab',
        github: 'https://github.com/arnab-git-404/',
        // portfolio: "https://janesmith.dev",
      },
    },
    {
      name: 'Sayan Sarkar',
      role: 'Cloud Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sayan_sarkar_N3ytFve.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/sayan-sarkar-724007306',
        github: 'https://github.com/Sayan0406',
        // twitter: "https://twitter.com/mikejohnson",
        // portfolio: "https://mikejohnson.dev",
      },
    },
    {
      name: 'Anirban Saha',
      role: 'Web Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/anirban_saha_vgGRYsN.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/anirban-saha-245640256/',
        github: 'https://github.com/TheFastest599',
        portfolio: 'https://anirban-saha-portfolio.netlify.app/',
      },
    },
    {
      name: 'Sanjeevan Nag',
      role: 'Management Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sanjeevan_nag_X3j2N6L.jpg',
      social: {
        // linkedin: "https://linkedin.com/in/davidbrown",
        // github: "https://github.com/davidbrown",
      },
    },
    {
      name: 'Rup Kumar Biswas',
      role: 'Graphics Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rup_kumar_biswas_hnuAsiY.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/rup-kumar-biswas-082452307/',
        twitter: 'https://github.com/RupB401',
        portfolio: 'https://rup-kumar-biswas-portfolio.netlify.app/',
      },
    },
    {
      name: 'Priyabrate Dey',
      role: 'Content Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/priyabrata_dey.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/priyabrata-dey-6a7930201',
        github: 'https://github.com/subho2112',
      },
    },
  ];

  const coordinators = [
    {
      name: 'Anand Kumar Jha',
      role: 'AI/ML Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/anand_kumar_jha_4CgIKel.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/anand-kumar-a308bb204/',
        github: 'https://github.com/2006anand',
      },
    },
    {
      name: 'Om Halder',
      role: 'Web Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/om_halder_Yizjzge.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/om-halder-26a92a35a/',
        github: 'https://github.com/om-halder',
        portfolio: 'https://om-halder-portfolio.netlify.app/',
      },
    },
    {
      name: 'Sadhna Jha',
      role: 'Management Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sadhna_jha_rY1tCFG.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sadhna-jha-aa1ba6292',
        github: 'https://github.com/SadhnaJha',
      },
    },
    {
      name: 'Sayan Pal',
      role: 'Design & Graphics Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sayan_pal_tOCbruN.jpg',
      social: {
        linkedin: 'https://in.linkedin.com/in/sayan-pal-673b2227a',
        github: 'https://github.com/reddevil212',
        portfolio: 'https://potfolio-sayan.netlify.app/',
      },
    },
    {
      name: 'Khushi Singh',
      role: 'Events & Operations Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/khushi_singh_KkeuzJ2.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/khushi-singh-aa932b290',
        // twitter: "https://twitter.com/mariarodriguez",
      },
    },
    {
      name: 'Anwesha Paul',
      role: 'Social Media & Content Co-Lead',
      image:
        'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/anwesha_paul_hyuD9CM.jpg',
      social: {
        // linkedin: "https://www.linkedin.com/in/japan-anwesha-paul-1b889b308/",
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src={icon}
            alt="Icon"
            className="size-10 sm:size-12 lg:size-14 rounded-md"
          />
          <div>
            <CardTitle className="scroll-m-20 my-1 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
              Google Clouds Study Jams 2025
            </CardTitle>
            <CardDescription>About GDG BCET & Our Mission</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-neutral-50 m-4 p-4 min-h-96 rounded-lg space-y-8">
        {/* Mission Statement */}
        <div className="text-center py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Driven by the Community at GDG BCET
          </h2>
          <p className="text-base sm:text-lg max-w-4xl mx-auto leading-relaxed text-gray-700">
            At GDG BCET, our mission is to empower students by creating a bridge
            between theoretical knowledge and practical, in-demand industry
            skills. The Google Cloud Study Jams is our flagship initiative to
            foster a vibrant community of cloud enthusiasts, providing a
            platform for hands-on learning, collaboration, and career growth.
          </p>
        </div>

        {/* What are Study Jams Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center py-8">
          {/* Left Column - Image/Illustration */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-none shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center">
                      <img
                        src="/icon.png"
                        alt="Cloud Learning"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Learn, Build, and Grow Together
            </h3>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Google Cloud Study Jams is a community-led learning program
              designed to help you gain practical experience with Google Cloud
              technologies through hands-on labs, structured learning paths, and
              peer collaboration.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Hands-On Labs
                  </h4>
                  <p className="text-sm text-gray-600">
                    Gain practical experience with real Google Cloud services
                    through guided, interactive exercises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Official Google Cloud Badges
                  </h4>
                  <p className="text-sm text-gray-600">
                    Earn verifiable credentials to showcase your cloud expertise
                    on your professional profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Community & Mentorship
                  </h4>
                  <p className="text-sm text-gray-600">
                    Connect with peers and learn from experienced mentors in a
                    supportive learning environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Meet the Organizing Team
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working behind the scenes to make this
              program a success.
            </p>
          </div>

          {/* Lead Organizer */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              GDGoC Organizer
            </h4>
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <TeamMemberCard member={leadOrganizer} isLead={true} />
              </div>
            </div>
          </div>

          {/* Core Team */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Core Team Members
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {coreTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Coordinators */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Co - Leads
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {coordinators.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Get In Touch Section */}
        <div className="py-8 bg-white rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
              Have Questions or Feedback?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We'd love to hear from you. Connect with us through our official
              channels.
            </p>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="mailto:gdg.bcet@gmail.com"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300 hover:scale-110"
              title="Email Us"
            >
              <Mail className="w-6 h-6" />
            </a>

            <a
              href="https://chat.whatsapp.com/KsMMEwchGvB65u6RyXUt6p"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-green-500 transition-colors duration-300 hover:scale-110"
              title="WhatsApp"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/gdgc_bcet/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-pink-500 transition-colors duration-300 hover:scale-110"
              title="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>

            <a
              href="http://in.linkedin.com/company/gdgc-bcet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-700 transition-colors duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="https://x.com/gdgc_bcet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
              title="Twitter"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://gdg.community.dev/gdg-on-campus-bengal-college-of-engineering-and-technology-durgapur-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110"
              title="Visit our Website"
            >
              <Globe className="w-6 h-6" />
            </a>

            <a
              href="https://discord.gg/BZaMCGF6VZ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-indigo-500 transition-colors duration-300 hover:scale-110"
              title="Join our Discord"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
