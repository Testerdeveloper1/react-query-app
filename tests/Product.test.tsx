import { render, fireEvent, screen } from '@testing-library/react';
import Product from "../src/_components/Products";
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

describe('Product', () => {
 it('renders Product component and deletes a product', async () => {
 // Mock the axios delete function
//  const deleteSpy = vi.spyOn(axios, 'delete').mockResolvedValue({ data: {} });

//  render(<Product />);

//  // Select a product
//  const selectAllButton = screen.getByText('Select All');
//  fireEvent.click(selectAllButton);

//  // Delete a product
//  const deleteButton = screen.getByText('Delete');
//  fireEvent.click(deleteButton);

//  // Check if the axios delete function was called
//  expect(deleteSpy).toHaveBeenCalledTimes(1);
 });
});
