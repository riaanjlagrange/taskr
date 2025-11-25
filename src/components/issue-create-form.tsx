"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IssueCreateForm({ 
  onSubmitAction,
  isPendingSubmit
}: { 
  onSubmitAction: (formData: FormData) => void
  isPendingSubmit: boolean
}) {
  
  return (
    <form
      onSubmit={
	(e) => {
	  e.preventDefault()
	  onSubmitAction(new FormData(e.currentTarget));
	  e.currentTarget.reset()
	}
      } className="border border-zinc-800 p-4 rounded-md w-full">
      <FieldSet className="flex  w-full justify-between items-end text-xs">
        <FieldGroup className="flex flex-col md:flex-row w-full gap-2 justify-between items-center">
          {/* issue title */}
          <Field className="w-fu">
	    <FieldLabel htmlFor="title">Submit Issue</FieldLabel>
            <Input
              id="title"
              name="title"
              autoComplete="off"
              placeholder="Ex. Header not showing up on contact page"
	      className="h-10"
              required
            />
          </Field>
          
          {/* issue priority */}
	  <div className="flex gap-2 justify-between md:w-auto w-full">
	    <Field className="flex-1">
	      <FieldLabel htmlFor="priority">Priority</FieldLabel>
	      <Select name="priority" defaultValue="MEDIUM" required>
		<SelectTrigger className="border border-zinc-700 bg-zinc-900 h-10 px-3 py-2 rounded-md">
		  <SelectValue placeholder="Select priority" />
		</SelectTrigger>
		<SelectContent className="bg-zinc-900 border border-zinc-700 rounded-md">
		  <SelectItem 
		    value="LOW" 
		    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
		  >
		    Low
		  </SelectItem>
		  <SelectItem 
		    value="MEDIUM" 
		    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
		  >
		    Medium
		  </SelectItem>
		  <SelectItem 
		    value="HIGH" 
		    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
		  >
		    High
		  </SelectItem>
		</SelectContent>
	      </Select>
	    </Field>
	    
	  {/* issue status */}
	    <Field className="flex-1">
	      <FieldLabel htmlFor="status">Status</FieldLabel>
	      <Select name="status" defaultValue="OPEN" required>
		<SelectTrigger className="border border-zinc-700 bg-zinc-900 h-10 px-3 py-2 rounded-md" disabled>
		  <SelectValue placeholder="Select status" className="text-white" />
		</SelectTrigger>
		<SelectContent className="bg-zinc-900 border border-zinc-700 rounded-md">
		  <SelectItem 
		    value="OPEN" 
		    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
		  >
		    Open
		  </SelectItem>
		  <SelectItem 
		    value="CLOSED" 
		    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
		  >
		    Closed
		  </SelectItem>
		</SelectContent>
	      </Select>
	    </Field>
	  </div>
        </FieldGroup>
        
        {/* submit */}
        <Field className="flex-1">
          <Button 
            type="submit"
            disabled={isPendingSubmit}
	    className="mb-1"
          >
            {isPendingSubmit ? <Spinner /> : "Submit"}
          </Button>
        </Field>
      </FieldSet>
    </form>
  )
}
