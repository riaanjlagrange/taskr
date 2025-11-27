import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex items-center gap-2 justify-center p-4 w-full fixed bottom-0 bg-zinc-900">
      <a href="https://github.com/riaanjlagrange/taskr" target="_blank" className="text-indigo-300 flex items-center gap-2 cursor-pointer">
	<FaGithub fill="white" />
	riaanjlagrange
      </a>
      <span className="talic text-zinc-200 text-sm">&copy; {new Date().getFullYear()}</span>
    </footer>
  )
}
