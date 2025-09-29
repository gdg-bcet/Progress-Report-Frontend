import React from "react";
import { ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TeamMemberCard = ({ member, isLead = false }) => {
  const { name, role, image, social } = member;

  return (
    <Card
      className={`
      bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 
      border-2 hover:border-blue-500/20 group ${
        isLead ? "aspect-square" : "aspect-[4/5] lg:aspect-square"
      }
      ${
        isLead
          ? "ring-2 ring-blue-500/20 bg-gradient-to-br from-blue-50 to-white"
          : ""
      }
    `}
    >
      <CardContent
        className={`${
          isLead ? "p-6" : "p-3 sm:p-4"
        } text-center h-full flex flex-col justify-center py-4`}
      >
        {/* Profile Image */}
        <div className="relative mb-2 sm:mb-3">
          <div
            className={`
            mx-auto rounded-full overflow-hidden border-4 
            ${
              isLead
                ? "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-blue-500"
                : "w-16 h-16 sm:w-20 sm:h-20 border-gray-300"
            } 
            group-hover:border-blue-500 transition-all duration-300
            group-hover:shadow-lg
          `}
          >
            <img
              src={image || "/avatar_ex.png"}
              alt={`${name} profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/avatar_ex.png";
              }}
            />
          </div>
          {isLead && (
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">★</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3
          className={`
          font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300 leading-tight
          ${
            isLead
              ? "text-sm sm:text-base lg:text-lg xl:text-xl"
              : "text-xs sm:text-sm lg:text-base"
          }
        `}
        >
          {name}
        </h3>

        {/* Role */}
        <p
          className={`
          text-gray-600 mb-2 sm:mb-3 font-medium leading-tight
          ${
            isLead
              ? "text-xs sm:text-sm lg:text-base"
              : "text-xs sm:text-xs lg:text-sm"
          }
        `}
        >
          {role}
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-1 sm:space-x-2">
          {social?.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isLead ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"
              } bg-gray-200 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/link`}
              title="LinkedIn"
            >
              <Linkedin
                className={`${
                  isLead ? "w-3 h-3 sm:w-4 sm:h-4" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                } text-gray-600 group-hover/link:text-white transition-colors duration-300`}
              />
            </a>
          )}

          {social?.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isLead ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"
              } bg-gray-200 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/link`}
              title="GitHub"
            >
              <Github
                className={`${
                  isLead ? "w-3 h-3 sm:w-4 sm:h-4" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                } text-gray-600 group-hover/link:text-white transition-colors duration-300`}
              />
            </a>
          )}

          {social?.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isLead ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"
              } bg-gray-200 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/link`}
              title="Twitter"
            >
              <Twitter
                className={`${
                  isLead ? "w-3 h-3 sm:w-4 sm:h-4" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                } text-gray-600 group-hover/link:text-white transition-colors duration-300`}
              />
            </a>
          )}

          {social?.portfolio && (
            <a
              href={social.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isLead ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"
              } bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/link`}
              title="Portfolio"
            >
              <ExternalLink
                className={`${
                  isLead ? "w-3 h-3 sm:w-4 sm:h-4" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                } text-gray-600 group-hover/link:text-white transition-colors duration-300`}
              />
            </a>
          )}

          {/* Show placeholder if no social links */}
          {!social?.linkedin &&
            !social?.github &&
            !social?.twitter &&
            !social?.portfolio && (
              <div
                className={`${
                  isLead ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"
                } bg-gray-200 rounded-full flex items-center justify-center opacity-50`}
              >
                <ExternalLink
                  className={`${
                    isLead
                      ? "w-3 h-3 sm:w-4 sm:h-4"
                      : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                  } text-gray-400`}
                />
              </div>
            )}
        </div>

        {/* Lead badge */}
        {isLead && (
          <div className="mt-2 sm:mt-3 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            Program Lead
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
