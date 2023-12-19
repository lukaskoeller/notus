/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Note } from '../models/Note';
import type { NoteCreate } from '../models/NoteCreate';
import type { NoteUpdate } from '../models/NoteUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get Notes
     * @returns Note Successful Response
     * @throws ApiError
     */
    public static getNotesNotesGet(): CancelablePromise<Array<Note>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notes/',
        });
    }

    /**
     * Get Note
     * @param id
     * @returns Note Successful Response
     * @throws ApiError
     */
    public static getNoteNoteIdGet(
        id: number,
    ): CancelablePromise<Note> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/note/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Note
     * @param id
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateNoteNoteIdPatch(
        id: number,
        requestBody: NoteUpdate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/note/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Note
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createNoteNotePost(
        requestBody: NoteCreate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/note/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
