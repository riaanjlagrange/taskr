"use client";

import { useState, useTransition } from "react";
import { createProject } from "../actions/project/actions";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function ProjectCreateForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // reset error when submitting
    setError(null);

    startTransition(async () => {
      const result = await createProject({
	title: formData.get('title') as string,
	description: formData.get('description') as string,
      })

      // if submission fails, show error in toast
      if (!result.success) {
	setError(result.error);
	toast.error(result.error);
	return;
      }

      // display success toast & redirect to project page
      toast.success(result.data.title + " - Project Created!");
      router.push("/projects")
    })
  }

  return (
      <form action={handleSubmit} className="border border-zinc-800 p-6 rounded-md w-full">
      <FieldSet>
	<FieldLegend>Create New Project</FieldLegend>
	<FieldGroup>
	  <Field>
	    <FieldLabel htmlFor="title">Project Title</FieldLabel>
	    <Input
	      id="title"
	      name="title"
	      autoComplete="off"
	      placeholder="Example: Taskr"
	      required
	    />
	  </Field>
	  <Field>
	    <FieldLabel htmlFor="description">Project Description</FieldLabel>
	    <Input
	      id="description"
	      name="description"
	      autoComplete="off"
	      placeholder="Shortly describe your project..."
	      required
	    />
	  </Field>
	</FieldGroup>
	<Field orientation="horizontal">
	  <Button 
	    type="submit"
	    disabled={isPending}
	  >
	    {isPending ? <Spinner /> : "Create Project"}
	  </Button>
	  <Button
	    variant="outline"
	    type="button"
	    disabled={isPending}
	    onClick={() => router.back()}
	  >
	    Cancel
	  </Button>
	</Field>
	{error && <FieldError>{error}</FieldError>}
      </FieldSet>
    </form>
  )
}
