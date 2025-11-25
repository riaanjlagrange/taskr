"use server";

import prisma from "@/lib/prisma";
import { ActionResponse, Project } from "@/type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


// create a new project

export async function createProject({
  title,
  description 
}: {
  title: string,
  description?: string
}): Promise<ActionResponse<Project>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // get / create user if not already exist
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId }
    })

    // create new project for user
    const project = await prisma.project.create({
      data: {
        title: title,
        description: description || "",
        userId: user.id, // use ID stored in db, not from clerk
      },
    });

    // make sure projects refresh correctly
    revalidatePath("/projects")

    // convert prisma type to UI type & return
    return {
      success: true,
      data: {
	id: project.id,
	title: project.title,
	description: project.description,
	userId: project.userId,
	issues: null,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString()
      }
    };
  } catch (error) {
    console.error("Create project error: ", error)
    return { success: false, error: "Failed to create project" }
  }
}


// get projects from user signed in user

export async function getProjects(): Promise<ActionResponse<Project[]>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // get projects from that user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
	projects: {
	  include: {
	    issues: true
	  }
	} 
      }
    })

    // make sure user exists
    if (!user) {
      return { success: false, error: "User not found" }
    }

    // convert to ui type
    return {
      success: true,
      data: user.projects.map((p) => ({
	id: p.id,
	title: p.title,
	description: p.description,
	userId: p.userId,
	issues: p.issues?.map((i) => ({
	  id: i.id,
	  title: i.title,
	  status: i.status,
	  priority: i.priority,
	  projectId: i.projectId,
	  createdAt: i.createdAt.toISOString(),
	  updatedAt: i.updatedAt.toISOString(),
	})) ?? null,
	createdAt: p.createdAt.toISOString(),
	updatedAt: p.updatedAt.toISOString()
      }))
    }
  } catch (error) {
    console.error("Get projects error: ", error)
    return { success: false, error: "Failed to fetch projects" }
  }
}


// get single project by id (issues included)

export async function getProjectById(projectId: number): Promise<ActionResponse<Project>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // get project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        user: { clerkId: userId }
      },
      include: {
        issues: true
      }
    })
    
    // make sure project exists
    if (!project) {
      return { success: false, error: "Project not found" };
    }

    // convert to ui type
    return {
      success: true,
      data: {
	id: project.id,
	title: project.title,
	description: project.description,
	userId: project.userId,
	issues: project.issues?.map((i) => ({
	  id: i.id,
	  title: i.title,
	  status: i.status,
	  priority: i.priority,
	  projectId: i.projectId,
	  createdAt: i.createdAt.toISOString(),
	  updatedAt: i.updatedAt.toISOString(),
	})) ?? null,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString()
      }
    };
  } catch (error) {
    console.error("Get project error ", error)
    return { success: false, error: "Failed to fetch project" }
  }
}


// update project by id

export async function updateProject({
  projectId,
  title,
  description
}: {
  projectId: number,
  title?: string,
  description?: string
}): Promise<ActionResponse<Project>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Make sure the project belongs to the current user
    const project = await prisma.project.findFirst({
      where: { 
        id: projectId,
        user: { clerkId: userId }
      }
    });
    
    if (!project) {
      return { success: false, error: "Project not found or not authorized" }
    }

    // update the project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
      },
      include: {
	issues: true,
      }
    });

    // refresh path
    revalidatePath("/projects")

    return {
      success: true,
      data: {
	id: updatedProject.id,
	title: updatedProject.title,
	description: updatedProject.description,
	userId: updatedProject.userId,
	issues: updatedProject.issues?.map((i) => ({
	  id: i.id,
	  title: i.title,
	  status: i.status,
	  priority: i.priority,
	  projectId: i.projectId,
	  createdAt: i.createdAt.toISOString(),
	  updatedAt: i.updatedAt.toISOString(),
	})) ?? null,
	createdAt: updatedProject.createdAt.toISOString(),
	updatedAt: updatedProject.updatedAt.toISOString()
      }
    };
  } catch (error) {
    console.error("Project update error: ", error)
    return { success: false, error: "Failed to update project"}
  }
}


// delete project by id

export async function deleteProjectById(projectId: number): Promise<ActionResponse<Project>> {
  try {
    // make sure the user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Make sure the project belongs to the current user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        user: { clerkId: userId }
      }
    });
    
    if (!project) {
      return { success: false, error: "Project not found or not authorized" };
    }
    
    // delete project
    await prisma.project.delete({
      where: { id: projectId }
    });

    revalidatePath("/projects")
    
    return {
      success: true,
      data: {
	id: project.id,
	title: project.title,
	description: project.description,
	userId: project.userId,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString()
      }
    };
  } catch (error) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
