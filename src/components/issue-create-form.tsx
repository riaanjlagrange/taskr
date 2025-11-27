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
import { useState } from "react";

export default function IssueCreateForm({ 
  onSubmitAction,
  isPendingSubmit
}: { 
  onSubmitAction: (formData: FormData) => void
  isPendingSubmit: boolean
}) {
  const [priority, setPriority] = useState("MEDIUM");
  
  return (
    <form
      onSubmit={
	(e) => {
	  e.preventDefault()
	  onSubmitAction(new FormData(e.currentTarget));
	  e.currentTarget.reset()
	  setPriority("MEDIUM")
	}
      } className="border border-zinc-800 p-4 rounded-md w-full">
      <FieldSet className="flex  w-full justify-between items-end text-xs">
        <FieldGroup className="flex flex-col md:flex-row w-full gap-2 justify-between items-center">

          {/* issue title */}
          <Field className="md:w-2/3 w-full">
	    <FieldLabel htmlFor="title">Submit Issue</FieldLabel>
            <Input
              id="title"
              name="title"
              autoComplete="off"
              placeholder="Briefly describe issue..."
	      className="h-10"
              required
            />
          </Field>
          
          {/* issue priority */}
	  <Field className="md:w-1/3 w-full">
	    <FieldLabel htmlFor="priority">Priority</FieldLabel>
	    <Select name="priority" value={priority} onValueChange={setPriority} required>
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
