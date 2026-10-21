import {
  Atom,
  Binary,
  BookOpen,
  Boxes,
  Braces,
  Code,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Layers,
  LayoutTemplate,
  Monitor,
  Palette,
  Route,
  Server,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  Workflow,
} from "lucide-react";

const ICONS = {
  atom: Atom,
  binary: Binary,
  book: BookOpen,
  boxes: Boxes,
  braces: Braces,
  code: Code,
  cpu: Cpu,
  database: Database,
  "file-code": FileCode,
  "git-branch": GitBranch,
  layers: Layers,
  layout: LayoutTemplate,
  monitor: Monitor,
  palette: Palette,
  route: Route,
  server: Server,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  terminal: Terminal,
  workflow: Workflow,
};

export default function Icon({ name, size = 18 }) {
  const Glyph = ICONS[name] ?? Code;
  return <Glyph size={size} strokeWidth={1.75} aria-hidden="true" />;
}
