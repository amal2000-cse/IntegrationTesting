## XINDUS: Assignment Submission (BACKEND)
 # Integration_Testing

# API Endpoints

## Endpoints

### GET

- **URL:** `http://localhost:3000/api/wishlists`
- **Description:** Retrieves all books from the wishlists.

### POST

- **URL:** `http://localhost:3000/api/wishlists`
- **Description:** Adds a new book to the wishlists.

### PUT

- **URL:** `http://localhost:3000/api/wishlists/2`
- **Description:** Updates the details of a book in the wishlists with ID 2.

### DELETE

- **URL:** `http://localhost:3000/api/wishlists/2`
- **Description:** Deletes the book with ID 2 from the wishlists.


# Test Cases

## GET /api/wishlists

This test verifies that the API successfully retrieves all books from the wishlists.

### Success Case: Get all books
- **Description:** Ensures that the API returns a list of books.
- **Expected Outcome:** Status code 200 is returned, and the response body contains an array of book objects.

## POST /api/wishlists

These tests validate the functionality of adding a book to the wishlists.

### Failure Case: Invalid Post Body
- **Description:** Tests the scenario where an invalid request body is provided.
- **Expected Outcome:** Status code 400 is returned, and the response body contains an error message indicating the required field.

### Success Case: Add a Book
- **Description:** Tests the successful addition of a book to the wishlists.
- **Expected Outcome:** Status code 200 is returned, and the response body contains a success message.

## PUT /api/wishlists/:bookid

These tests verify the update functionality of the API for a specific book.

### Failure Case: Book Not Found
- **Description:** Tests the scenario where the provided book ID is not found.
- **Expected Outcome:** Status code 404 is returned, and the response body contains an error message indicating that the book was not found.

### Success Case: Update a Book
- **Description:** Tests the successful update of a book in the wishlists.
- **Expected Outcome:** Status code 201 is returned, and the response body contains the updated book details.

## DELETE /api/wishlists/:bookid

These tests validate the deletion functionality of the API for a specific book.

### Failure Case: Book Not Found
- **Description:** Tests the scenario where the provided book ID is not found for deletion.
- **Expected Outcome:** Status code 404 is returned, and the response body contains an error message indicating that the book was not found.

### Success Case: Delete a Book
- **Description:** Tests the successful deletion of a book from the wishlists.
- **Expected Outcome:** Status code 201 is returned, and the response body contains a success message.
