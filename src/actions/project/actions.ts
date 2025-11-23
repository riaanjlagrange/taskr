"use server";

import prisma from "@/src/lib/prisma";
import { ActionResponse, Project } from "@/src/type";
import { auth } from "@clerk/nextjs/server";


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

    return { success: true, data: project };
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
      include: { projects: true }
    })

    // make sure user exists
    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { success: true, data: user.projects || []}
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

    return { success: true, data: project }
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
    });

    return { success: true, data: updatedProject }
  } catch (error) {
    console.error("Project update error: ", error)
    return { success: false, error: "Failed to update project"}
  }
}


// delete project by id

export async function deleteProjectById(projectId: number): Promise<ActionResponse> {
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
    
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
