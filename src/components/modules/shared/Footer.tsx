import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    services: [
      { label: "Web Development", href: "#web-dev" },
      { label: "Mobile Apps", href: "#mobile" },
      { label: "UI/UX Design", href: "#design" },
      { label: "Consulting", href: "#consulting" },
    ],
    resources: [
      { label: "Blog", href: "#blog" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
    ],
  };

  const socialLinks = [
    { icon: Github, url: "https://github.com/yourusername", label: "GitHub" },
    {
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      url: "https://twitter.com/yourusername",
      label: "Twitter",
    },
    { icon: Mail, url: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <footer>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Himadree Chaudhury
            </h3>
            <p className="dark:text-slate-400 text-sm leading-relaxed">
              Full Stack Developer passionate about creating elegant solutions
              to complex problems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border rounded-lg hover:bg-foreground hover:text-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="dark:text-slate-400 text-slate-600 hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="dark:text-slate-400 text-slate-600 hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="dark:text-slate-400 text-slate-600 hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="dark:text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Himadree Chaudhury. All rights reserved.
            </p>
            <p className="dark:text-slate-400 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
              passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
